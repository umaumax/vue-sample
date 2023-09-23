import {
    reactive
} from "vue";

export const state = reactive({
    connected: false,
    data: [],
    columns: [{
        label: "ID",
        field: "id",
        width: "3%",
        sortable: true,
        isKey: true,
    }, ]
});

function update_table(data) {
    const timestamp = data.timestamp;
    const group = data.group;
    const sequential_id = data.sequential_id;
    const label = data.label;

    var columns_data = {
        'id': sequential_id,
        'label': label,
    };
    for (const key in data.data) {
        const data_key = 'data:' + key
        if (!columns_data.hasOwnProperty(data_key)) {
            columns_data[data_key] = data.data[key];
        }
    }
    state.data.push(columns_data);

    for (const key in columns_data) {
        if (!state.columns.some(column => column.field === key)) {
            state.columns.push({
                label: key,
                field: key,
                width: "10%",
                sortable: true,
            });
        }
    }
}

const mode = 'dummy'
// const mode='ws'

if (mode == 'dummy') {
    var data = {
        "timestamp": 0,
        "group": "session-123",
        "sequential_id": 0,
        "label": "test",
        "data": {
            "position.x": -1.0,
            "position.y": -2.0,
            "position.z": -3.0,
            "rotation.x": 1.0,
            "rotation.y": 2.0,
            "rotation.z": 3.0,
            "rotation.w": 4.0,
        }
    }
    setInterval(() => {
        if (data.sequential_id >= 200) {
            return
        }

        update_table(data)
        data.sequential_id += 1
        data.timestamp += 1000
        data.data['position.x'] += 0.01
        data.data['position.y'] += 0.01
        data.data['position.z'] += 0.01
        data.data['rotation.x'] += 0.01
        data.data['rotation.y'] += 0.01
        data.data['rotation.z'] += 0.01
        data.data['rotation.w'] += 0.01
    }, 500);
}

if (mode == 'ws') {
    const host = window.location.hostname
    const port = 8765
    const path = 'ws/get/database'
    const url = 'ws://' + host + ':' + port + '/' + path
    const socket = new WebSocket(url);

    socket.addEventListener('open', (event) => {
        console.log('connection opened');

        state.connected = true;

        // sample query data to websocket server
        const query_data = {
            group: 'session-test',
            timestamp: '12345'
        };

        socket.send(JSON.stringify(query_data));
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        console.log('received data:', data);
        update_table(data)
    });
}
