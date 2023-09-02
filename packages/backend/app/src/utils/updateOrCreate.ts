/**
 * This function updates an existing record or creates a new one if the record does not exist.
 * It is commonly known as the "upsert" operation.
 *
 * @param model - The Sequelize model that represents the table you are working with.
 * @param where - Conditions for the search query to determine if the record exists.
 * @param newItem - The data you want to insert or update.
 * @returns - Returns the updated or newly created item.
 */
export async function updateOrCreate(model: any, where: any, newItem: any) {

    // Check if the provided 'where' condition has values, then try to find a record with that condition.
    // If the condition values are undefined, skip the search and proceed to creation.
    const foundItem = typeof Object.values(where) !== 'undefined' ? await model.findOne({ where }) : false;

    // If no matching record is found in the database
    if (!foundItem) {
        
        // In case the user provided an ID in the 'newItem' that matches the 'where' condition's key, we remove it.
        // This is to ensure that we don't try to insert a record with a predefined ID which might lead to conflicts.
        delete newItem[Object.keys(where)[0]];

        // Create a new record with the provided data
        const item = await model.create(newItem);
        return item;
    }

    // If a matching record is found, update it with the provided new data.
    await model.update(newItem, { where });

    // Return the updated record for confirmation.
    return await model.findOne({ where });
}