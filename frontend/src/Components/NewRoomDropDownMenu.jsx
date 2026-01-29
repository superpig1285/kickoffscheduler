import CreateNewRoomIcon from "../../public/plus.svg?react";

function NewRoomDropDownMenu({
    openCreate,
    setOpenCreate,
    newRoomName,
    setNewRoomName,
    checked,
    setChecked,
    newRoomPassword,
    setNewRoomPassword,
}) {
    return (
        <>
            <button className="icon-button" onClick={() => setOpenCreate((o) => !o)}>
                <img src={CreateNewRoomIcon} /> New room
            </button>
            <div className={`room-input-wrapper ${openCreate ? "open" : ""}`}>
                <input
                    name="room_name"
                    type="text"
                    placeholder="Name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                ></input>
                <label>
                    <input name="require_password" type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)}></input>
                    Require Password
                </label>
                <input
                    className={`create-new-room-password ${checked && openCreate ? "open" : ""}`}
                    name="create_room_password"
                    type="text"
                    placeholder="Password"
                    value={newRoomPassword}
                    onChange={(e) => setNewRoomPassword(e.target.value)}
                ></input>

                <button className={`create-room-button ${newRoomName != "" ? "open" : ""}`}>Create Room</button>
            </div>
        </>
    );
}

export default NewRoomDropDownMenu;
