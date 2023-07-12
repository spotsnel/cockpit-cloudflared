import React from 'react';

import { CloudflareTunnel } from './types';
import {
    ExpandableRowContent,
    Table, Caption, Thead, Tbody, Tr, Th, Td,
    SortByDirection,
} from '@patternfly/react-table';


type ApplicationProps = {
}

type ApplicationState = {
    Tunnels: CloudflareTunnel
}

export class Application extends React.Component<ApplicationProps, ApplicationState> {
    state: ApplicationState = {
        Tunnels: null
    }

    constructor(props: ApplicationProps) {
        super(props);

        cockpit
        .spawn(['cloudflared', 'tunnel', 'list', '-o', 'json'])
        .done(content => {
            const tunnels: CloudflareTunnel = JSON.parse(content)
            this.setState(state => ({ Tunnels: tunnels }));
        });

    }

    render() {
        return (
            <> {
                this.state.Tunnels != null
                    ? <Table
                            aria-label="Cloudflare tunnels"
                            variant='compact' borders={false}>
                            <Caption>Cloudflare tunnels</Caption>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Connections</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    Object.values(this.state.Tunnels)
                                        .map(tunnel => {
                                            return <Tunnel {...tunnel} />
                                        }
                                    )
                                }
                            </Tbody>
                        </Table>

                    : <p>Loading...</p>
                }
            </>
    )}
}

class Tunnel extends React.Component<CloudflareTunnel> {
    render() {

        var connections = "-"
        if (this.props.connections) {
            const mapped_items = this.props.connections.map(t => { return t.colo_name })
            connections = mapped_items.join(', ')
        }

        return (
            <Tr>
                <Td>{this.props.id}</Td>
                <Td>{this.props.name}</Td>
                <Td>{connections}</Td>
            </Tr>);
    }
}