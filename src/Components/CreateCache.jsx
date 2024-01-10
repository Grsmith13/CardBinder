// CreateCache.js
import axios from "axios";

const apiUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php"; // Update with your API endpoint

const dbName = "YGoDatabase";
const storeName = "KameGame";

let db;

// Function that creates or opens the database
const createDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    // Event handling
    request.onupgradeneeded = (e) => {
      db = e.target.result;
      if (!db.objectStoreNames.contains(storeName))
        db.createObjectStore(storeName, { keyPath: "name" });
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
};

const storeData = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);

      // Log data to check its structure
      console.log("Data to store:", data);

      // Iterate over the array and store each item individually
      data.data.forEach((item) => {
        // Log key path for debugging
        const putRequest = objectStore.put(item);

        // Event handling
        putRequest.onsuccess = () => {
          resolve();
        };

        putRequest.onerror = (e) => {
          console.error("storeData error", e.target.error);
          reject(e.target.error);
        };
      });
    } catch (err) {
      console.error("storeData error", err);
      reject(err);
    }
  });
};
// Function that fetches the data from the API and then stores it in the database
export const fetchAndStore = async () => {
  try {
    // Fetching the data from the API
    const response = await axios.get(apiUrl);
    const data = response.data;

    //Open/create the database
    await createDatabase();

    // Store the data in the database
    await storeData(data);

    console.log("Data has been fetched and stored", data);
  } catch (err) {
    console.error("Error fetching or storing data:", err);
  }
};

export const getData = async (name) => {
  try {
    // Open/create the database
    await createDatabase();

    return new Promise((resolve, reject) => {
      const request = db
        .transaction(storeName)
        .objectStore(storeName)
        .get(name);

      request.onsuccess = (e) => {
        const result = e.target.result;
        if (result) {
          resolve(result);
        } else {
          reject(new Error(`Card with name ${name} not found`));
        }
      };

      request.onerror = (e) => {
        reject(new Error(`Error fetching card data: ${e.target.error}`));
      };
    });
  } catch (error) {
    console.error("Error opening database:", error);
    throw error;
  }
};
