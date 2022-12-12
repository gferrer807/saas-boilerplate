const url = '/api/openai';

export interface FormProps {
    jobTitle: string
    remotePosition: boolean
    description: string
    yearsOfExperience: number
    visa: boolean
    tags?: string[]
    location?: string
}

export const getJobDescriptionWithPrompt = async ({
    location,
    jobTitle,
    remotePosition,
    description,
    yearsOfExperience,
    visa,
    tags,
}: FormProps) => {
    const reqBody = {
        jobTitle: jobTitle,
        remotePosition: remotePosition,
        description: description,
        yearsOfExperience: yearsOfExperience,
        visa: visa,
        tags: tags,
        location: location,
    }
    let headers = new Headers()
    const fetchOptions = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(reqBody)
    }
    let response = await fetch(url, fetchOptions)
    .then(res => res.text())
    .catch(err => console.log("Err", err))
    return response
}