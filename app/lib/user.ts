"use server"

import { headers } from 'next/headers'

interface Claims {
    claims: [
        { typ: string, val: string }
    ]
}

let users: Record<string, string> | undefined = undefined;

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
    return principalId || undefined
}

export async function getUserMap(): Promise<Record<string, string>>  {
    if(!users) {
        const tokenResponse = await fetch("https://login.microsoftonline.com/d7d42ef6-33fa-4c09-a7aa-9ace57cb0bbb/oauth2/v2.0/token", {
            method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },    
              body: new URLSearchParams({
                client_id: process.env.AZURE_CLIENT_ID || "",
                scope: "https://graph.microsoft.com/.default",
                client_secret: process.env.AZURE_CLIENT_SECRET || "",
                grant_type: "client_credentials"
              })
        });

        const tokenJson = await tokenResponse.json();
        const bearerToken = tokenJson.access_token;

        const usersResponse = await fetch("https://graph.microsoft.com/v1.0/users?$select=displayName,id", {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        });

        const usersJson = await usersResponse.json();
        users = usersJson.value.reduce((acc: Record<string, string>, user: { displayName: string, id: string }) => { acc[user.id] = user.displayName; return acc }, {});
    }

    return users as Record<string, string>;
}