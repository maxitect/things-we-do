import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { createRxDatabase, RxDatabase } from "rxdb";
import toolkitItemSchema from "./schemas/toolkitItemSchema.json";
import moodRecordSchema from "./schemas/moodRecordSchema.json";
import categoriesSchema from "./schemas/categoriesSchema.json";
import { v4 as uuidv4 } from "uuid";

addRxPlugin(RxDBDevModePlugin);

const seedData = {
  categories: [
    { id: uuidv4(), name: "Replace", timestamp: new Date().toISOString() },
    { id: uuidv4(), name: "Barrier", timestamp: new Date().toISOString() },
    { id: uuidv4(), name: "Distract", timestamp: new Date().toISOString() },
    {
      id: uuidv4(),
      name: "Change Status",
      timestamp: new Date().toISOString(),
    },
  ],
  toolkit: [
    {
      id: uuidv4(),
      name: "Listen to my favourite music",
      categories: ["Replace", "Barrier"],
      checked: false,
      infoUrl: "https://google.com/music",
      imageUrl:
        "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
      timestamp: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Breathing exercises",
      categories: ["Distract"],
      checked: false,
      infoUrl: "https://www.youtube.com/watch?v=DbDoBzGY3vo",
      imageUrl:
        "https://www.bhf.org.uk/-/media/images/information-support/heart-matters/2023/december/wellbeing/deep-breathing-620x400.png?h=400&w=620&rev=4506ebd34dab4476b56c225b6ff3ad60&hash=B3CFFEEE704E4432D101432CEE8B2766",
      timestamp: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Call a friend",
      categories: ["Distract", "Change status"],
      checked: false,
      infoUrl: "https://example.com/call",
      imageUrl:
        "https://t4.ftcdn.net/jpg/04/63/63/59/360_F_463635935_IweuYhCqZRtHp3SLguQL8svOVroVXvvZ.jpg",
      timestamp: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Drink water",
      categories: ["Distract", "Change status"],
      checked: false,
      infoUrl: "https://example.com/call",
      imageUrl:
        "https://content.health.harvard.edu/wp-content/uploads/2023/07/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg",
      timestamp: new Date().toISOString(),
    },
  ],
};

let dbInstance: RxDatabase | null = null;

class DatabaseManager {
  private static instance: DatabaseManager;

  private constructor() {}

  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  private async createDatabase() {
    if (dbInstance) return dbInstance;
    dbInstance = await createRxDatabase({
      name: "database",
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    });

    const existingCollections = Object.keys(dbInstance.collections);
    if (!existingCollections.includes("categories")) {
      console.log("Database initialising...");
      await dbInstance.addCollections({
        categories: { schema: categoriesSchema },
        mood_records: { schema: moodRecordSchema },
        toolkit_items: { schema: toolkitItemSchema },
      });
      await this.seedDatabase();
    } else {
      console.log("Database instance rebooting after page reload...");
    }
    return dbInstance;
  }

  async accessDatabase() {
    if (!dbInstance) {
      dbInstance = await this.createDatabase();
    }
    if (!dbInstance) {
      throw new Error("Failed to initialise the database.");
    }
    console.log("Accessing database...");
    return dbInstance;
  }

  private async seedDatabase() {
    console.log("Seeding database...");
    await this.seedCategories();
    await this.seedToolkitItems();
  }

  private async seedCategories() {
    if (!dbInstance) throw new Error("Database not initialised");
    const existingDocs = await dbInstance.categories.find().exec();
    if (existingDocs.length === 0) {
      console.log("Seeding categories...");
      await dbInstance.categories.bulkInsert(seedData.categories);
    }
  }

  private async seedToolkitItems() {
    if (!dbInstance) throw new Error("Database not initialised");
    const existingDocs = await dbInstance.toolkit_items.find().exec();
    if (existingDocs.length === 0) {
      console.log("Seeding toolkit...");
      await dbInstance.toolkit_items.bulkInsert(seedData.toolkit);
    }
  }

  async getFromDb(collection: string) {
    const db = await this.accessDatabase();
    const collectionExists = db[collection];
    if (!collectionExists)
      throw new Error(`Collection '${collection}' not found`);
    const data = await collectionExists.find().exec();
    console.log(`Getting data from ${collection}:`);
    console.log(data);
    return data;
  }

  async addToDb(collectionName: string, document: object) {
    const db = await this.accessDatabase();
    const collection = db[collectionName];
    if (!collection)
      throw new Error(`Collection '${collectionName}' not found`);
    const data = await collection.insert({
      ...document,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    });
    console.log(`Adding data to ${collectionName}:`);
    console.log(data);
    return data;
  }

  async addCategories(name: string) {
    return this.addToDb("categories", {
      name,
      timestamp: new Date().toISOString(),
    });
  }

  async deleteFromDb(collectionName: string, docId: string): Promise<void> {
    try {
      const db = await this.initialiseDatabase();
      const collection = db[collectionName];
      if (!collection) {
        throw new Error(`Collection '${collectionName}' does not exist`);
      }
      const document = await collection.findOne({ selector: { id: docId } }).exec();
      if (!document) {
        throw new Error(`Document with ID '${docId}' not found`);
      }
      await document.remove();
      //console.log(`Document with ID '${docId}' successfully removed`);
    } catch (error) {
      console.error(`Error in deleteFromDb:`, error);
      throw error;
    }
  }

}

export default DatabaseManager.getInstance();
