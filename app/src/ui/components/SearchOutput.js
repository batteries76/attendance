import React, { Fragment } from 'react';

const SearchOutput = (props) => {

    return (
        <Fragment>
            <h2> SEARCH OUTPUT COMPONENT </h2>
            <div>
                <h3> JUST the items </h3>
                {props.items}
            </div>
            <div>
                <h3> FILTERED items </h3>
                {props.filteredPartsHTML}
            </div>
        </Fragment>
    )

}

export default SearchOutput