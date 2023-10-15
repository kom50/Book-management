import { MongoClient } from 'mongodb'

export default async function connectDb(dbURL: string, dbName: string) {
    const client = new MongoClient(dbURL)
    let conn: MongoClient | null = null

    try {
        conn = await client.connect()
    } catch (e) {
        console.error(e)
    }

    return conn!.db(dbName)
}
