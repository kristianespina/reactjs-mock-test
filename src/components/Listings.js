import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const FETCH_VISITORS = gql`
    query visitors($offset: Int = 0,$limit: Int = 10) {
        visitors(offset: $offset, limit: $limit) {
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
    // fake-data
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
        </>
    )
}


export default Listings;