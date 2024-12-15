import { Table } from "semantic-ui-react";

function RatingList() {
    return (
        <div>
            <h2>Rating List</h2>
            <Table celled padded style={{ width: "90%", margin: "auto" }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body></Table.Body>
            </Table>
        </div>
    );
}

export default RatingList;
