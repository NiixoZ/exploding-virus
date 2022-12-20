import $ from "jquery";

async function getRoomInfos(roomCode) {
    let roomData = {};
    await $.getJSON(process.env.VUE_APP_SOCKET_ENDPOINT + '/room?roomCode=' + roomCode, function(data) {
        roomData = data;
    });
    return roomData;
}

export default {
    getRoomInfos
}