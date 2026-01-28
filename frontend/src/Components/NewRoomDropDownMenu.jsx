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
            <h2 className="title">Kickoff Scheduler</h2>

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
                {checked && (
                    <input
                        name="create_room_password"
                        type="text"
                        placeholder="Password"
                        value={newRoomPassword}
                        onChange={(e) => setNewRoomPassword(e.target.value)}
                    ></input>
                )}
                {openCreate && newRoomName != "" && <button className="create-room-button">Create</button>}
            </div>
        </>
    );
}

export default NewRoomDropDownMenu;
