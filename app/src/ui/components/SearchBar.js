import React, { Component, Fragment } from 'react'

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            filteredParts: [],
            filteredPartsHTML: []
        }
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
        this.setFilteredItems(this.state.query)
    }

    setFilteredItems(query) {
        const filteredItems = this.props.parts.filter(part => {
            return part.partNumber.includes(query)
        })
        this.setState({ filteredParts: filteredItems })
        this.getFilteredItemsInHTML(filteredItems)
    }

    getFilteredItemsInHTML(filteredItemArray){
        console.log(filteredItemArray)
        const filteredItemsHTML = filteredItemArray.map((part, index) => {
            console.log(part)
            return (
                <li key={index}>
                    {part.lastName}
                </li>
            )
        })
        this.setState({ filteredPartsHTML: filteredItemsHTML })
    }

    render() {
        return (
            <Fragment>
                <h2> Search Bar </h2>
                <form>
                    <input
                        placeholder="Search for..."
                        onChange={this.handleInputChange}
                    />

                </form>
                <h2> SEARCH OUTPUT COMPONENT </h2>
                <SearchOutput {...this.state} />
            </Fragment>
        )
    }
}

export default Search