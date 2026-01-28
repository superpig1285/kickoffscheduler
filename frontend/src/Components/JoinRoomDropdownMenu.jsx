import JoinRoomIcon from "../../public/open_door.svg?react";

function JoinRoomDropDownMenu({ openSearch, setOpenSearch, searchText, setSearchText, rooms }) {
    return (
        <>
            <button className="icon-button" onClick={() => setOpenSearch((o) => !o)}>
                <img src={JoinRoomIcon} /> Join a room
            </button>
            <div className={`search-room-input-wrapper ${openSearch ? "open" : ""}`}>
                <div className="current-rooms-list">
                    <input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                    <ul>
                        <li className="room-list-header">
                            <div>Room Name</div>
                            <div>Owner</div>
                            <div>Members</div>
                        </li>
                        {rooms.map((room) => (
                            <li className="room-list-object" key={room.roomId}>
                                {room.name}
                                {room.owner}
                                {room.members}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default JoinRoomDropDownMenu;
