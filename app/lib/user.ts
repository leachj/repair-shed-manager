import { headers } from 'next/headers'

interface Claims {
    claims: [
        { typ: string, val: string }
    ]
}

export async function getUserName() {
    const headersList = await headers()
    const principalName = headersList.get('X-MS-CLIENT-PRINCIPAL-NAME')
    const encodedClaimString = headersList.get('X-MS-CLIENT-PRINCIPAL')
    if (encodedClaimString) {
        const decodedClaimString = Buffer.from(encodedClaimString, 'base64').toString('ascii');
        const claims = JSON.parse(decodedClaimString) as Claims
        const nameClaim = (claims?.claims || []).find((claim: { typ: string }) => claim.typ == "name")

        if (nameClaim && nameClaim.val) {
            return nameClaim.val;
        }
    }

    return principalName || "Unknown"
}

export async function getUserId() {
    const headersList = await headers()
    const principalId = headersList.get('X-MS-CLIENT-PRINCIPAL-ID')
    return principalId
}