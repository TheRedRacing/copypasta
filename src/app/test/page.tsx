'use client'

export default function Test() {

    function handleClick() {
        const clipboardArchive = [{ id: 5, text: "KBS00026614", isPrivate: false }];
        const clipboardArchiveOrder = [5];
        const clipboardOrder = [1, 0, 13, 12, 4, 9, 7, 6, 3, 2, 10, 11];
        const clipboardTexts = [{ "id": 13, "text": "https://pmiv.service-now.com/interact?id=sc_cat_item&sys_id=dc51809d1bff3d90d6c4dbd0b24bcb74", "isPrivate": false }, { "id": 12, "text": "KBS00028882", "isPrivate": false }, { "id": 11, "text": "Hajee, Rishaad - PMIZACPTD001000", "isPrivate": false }, { "id": 9, "text": "Awaiting before send reminder.", "isPrivate": false }, { "id": 10, "text": "On site support provided at InteracT Bar Lausanne by Sickenberg, Maxime (contracted)", "isPrivate": false }, { "id": 7, "text": "15\" break", "isPrivate": false }, { "id": 6, "text": "PMICHLAUMC32334", "isPrivate": false }, { "id": 4, "text": "- TV turned on: OK\n- Meeting invite is available on the screen: OK\n- Were you able to connect to the meeting: OK\n- Were you able to add persons to the meetings: OK\n- Good audio and video quality: OK\n- Able to share content via HDMI: OK\n- TV remote not present in the room: OK\n- Booklet present in the room: OK", "isPrivate": false }, { "id": 3, "text": "EU_TTGLOBAL\\MSICKENB", "isPrivate": false }, { "id": 2, "text": "maxime.sickenberg@stefanini.com", "isPrivate": false }, { "id": 1, "text": "a-msickenb@pmintl.net", "isPrivate": false }, { "id": 0, "text": "&@CXXRDXmbc378!", "isPrivate": true }]

        localStorage.setItem("clipboardArchive", JSON.stringify(clipboardArchive));
        localStorage.setItem("clipboardArchiveOrder", JSON.stringify(clipboardArchiveOrder));
        localStorage.setItem("clipboardOrder", JSON.stringify(clipboardOrder));
        localStorage.setItem("clipboardTexts", JSON.stringify(clipboardTexts));
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Test Page</h1>
            <p className="text-gray-700 mb-4">This is a test page.</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleClick()}>
                Click Me
            </button>
        </div>
    );
}