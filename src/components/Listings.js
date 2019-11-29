/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const FETCH_VISITORS = gql`
    query visitors($date: Int = 0, $offset: Int = 0,$limit: Int = 10) {
        visitors(date: $date, offset: $offset, limit: $limit) {
            datetime
            ip_address
            device
        }
    }
`

/*
* The listing page should be orderable and have pagination. It has 4 filters: Today, Yesterday, Last Week, This month.
*/

function Listings(props) {
    const { loading, error, data } = useQuery(FETCH_VISITORS, {
        // No Args

    });

    if (loading) return <p>Fetching ...</p>;
    console.log(data);
    return (
        <>
        <div className="table-container">
            <table className="table is-fullwidth is-hoverable">
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>IP Address</th>
                        <th>Device</th>
                    </tr>
                    {
                        // fake_data = data (if in production)
                        data.visitors.map((visitor) => (
                            <tr key={visitor.datetime}>
                                <td>{new Date(parseInt(visitor.datetime)).toDateString()}</td>
                                <td>{visitor.ip_address}</td>
                                <td>{visitor.device}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        <nav className="pagination is-small" role="navigation" aria-label="pagination">
            <a className="pagination-previous">Previous</a>
            <a className="pagination-next">Next page</a>
            <ul className="pagination-list">
                <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
                <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                <li><a className="pagination-link" aria-label="Goto page 86">86</a></li>
            </ul>
        </nav>
        </>
    )
}


export default Listings;