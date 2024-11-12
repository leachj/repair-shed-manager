import { headers } from 'next/headers'

export async function getUserName() {
    const headersList = await headers()
    const principalName = headersList.get('X-MS-CLIENT-PRINCIPAL-NAME')
    const claims = headersList.get('X-MS-CLIENT-PRINCIPAL')
    return principalName + " " + claims || "Unknown"
}