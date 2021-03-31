const express = require('express');
const fs = require('fs');
const router = express.Router();

// FUNCTIONS
const getData = (url) => {
    return JSON.parse(fs.readFileSync(url))
};

const writeData = (url, data) => {
    fs.writeFileSync(url, JSON.stringify(data));
};

// VARIABLES
const shoppingListURL = './data/shoppingList.json';

// ROUTES

router
    .route('/')
    // see all items in the shoppingList
    .get((req, res) => {
        const result = getData(shoppingListURL);
        res.json(result);
    })
    // Add an item(s) to the shoppingList
    .post((req, res) => {

        let shoppingListData = getData(shoppingListURL);

        const { item, itemId, recipeFor, recipeId, category, recipeQty, qtyNeeded } = req.body;

        const newListItem = {
                "item" : item,
                "itemId" : itemId,
                "recipeFor" : recipeFor,
                "recipeId" : recipeId,
                "category" : category,
                "recipeQty" : recipeQty,
                "qtyNeeded" : qtyNeeded,
                "inCart" : false
        }

        shoppingListData.push(newListItem);
        // writeData(shoppingListURL, shoppingListData);

        res.status(200).json(newListItem);
    })

router
    .route('/:itemId')
    // check if specific item is in the shoppingList
    .get((req, res) => {
        const shoppingListData = getData(shoppingListURL);
        const { itemId } = req.params;

        const result =shoppingListData.filter(item => {
            return itemId === item.itemId;
        });

        if (result.length > 0) res.status(200).json(result);
        else res.status(404).json('Cannot find item.');
        
    })
    // Edit an item in the shoppingList
    .put((erq, res) => {
        res.json('updated');
    })
    // Delete an item(s) from the shoppingList
    .delete((req, res) => {
        res.json("deleted");
    })


// EXPORTS
module.exports = router;