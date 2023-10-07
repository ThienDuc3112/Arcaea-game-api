import * as google from "googleapis"

const getSheetClient = (spreadsheetId: string) => {
    const auth = new google.Auth.GoogleAuth({
        keyFile: "arcaea_sheet.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    return new google.sheets_v4.Sheets({ auth, params: { auth, spreadsheetId } })
}

export { getSheetClient }