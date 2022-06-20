import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE'
import Header from "./components/Header/Header";
import {createDataSet} from "./data/dataset"
import "./App.css"
import Instructions from "./components/Instructions/Instructions";
import Chip from "./components/Chip/Chip";
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel";
import {useState} from "react";

// don't move this!
export const appInfo = {
    title: `Fast Food Feud 🍔!`,
    tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
    description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
    dataSource: `All data pulled from the MenuStat.org interactive online database.`,
    instructions: {
        start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
        onlyCategory: `Now select a fast food restaurant from the list above!`,
        onlyRestaurant: `Now select a category from the list on the left!`,
        noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
        allSelected: `Great choice! Amazing what a little knowledge can do!`,
    },
}
// or this!
const {data, categories, restaurants} = createDataSet()

export function App() {
    const [selectedCategory, setCategory] = useState(null)
    const [selectedRestaurant, setRestaurant] = useState(null)
    const [selectedItem, setItem] = useState(null)

    const currentMenuItems = data.filter((d) => {
        return d.food_category === categories[selectedCategory] && d.restaurant === restaurants[selectedRestaurant];
    })

    console.log(currentMenuItems)

    return (
        <main className="App">
            <Header title={appInfo.title}
                    tagline={appInfo.tagline}
                    description={appInfo.description}/>
            {/* CATEGORIES COLUMN */}
            <div className="CategoriesColumn col">
                <div className="categories options">
                    <h2 className="title">Categories</h2>
                    {categories.map((category, id) => {
                        return <Chip key={'category-' + id} label={category} isActive={selectedCategory === id}
                                     onClick={() => {
                                         setItem(null)
                                         setCategory(id);
                                     }
                                     }/>
                    })}
                </div>
            </div>

            {/* MAIN COLUMN */}
            <div className="container">
                {/* HEADER GOES HERE */}

                {/* RESTAURANTS ROW */}
                <div className="RestaurantsRow">
                    <h2 className="title">Restaurants</h2>
                    <div className="restaurants options">
                        {restaurants.map((restaurant, id) => {
                            return <Chip key={'restaurant-' + id} label={restaurant}
                                         isActive={selectedRestaurant === id}
                                         onClick={() => {
                                             setItem(null)
                                             setRestaurant(id);
                                         }}/>
                        })}
                    </div>
                </div>

                <Instructions instructions={appInfo.instructions.start}/>

                {/* MENU DISPLAY */}
                <div className="MenuDisplay display">
                    <div className="MenuItemButtons menu-items">
                        <h2 className="title">Menu Items</h2>
                        {currentMenuItems.map((menuItem, id) => {
                            console.log(menuItem)
                            return <Chip key={'menu-item-' + id} label={menuItem.item_name}
                                         isActive={selectedItem === id}
                                         onClick={() => {
                                             console.log(menuItem)
                                             setItem(id);
                                         }}/>
                        })}
                    </div>

                    {/* NUTRITION FACTS */}
                    <div className="NutritionFacts nutrition-facts">
                        {selectedItem !== null && <NutritionalLabel item={currentMenuItems.at(selectedItem)}/>}
                    </div>
                </div>

                <div className="data-sources">
                    <p>{appInfo.dataSource}</p>
                </div>
            </div>
        </main>
    )
}

export default App
