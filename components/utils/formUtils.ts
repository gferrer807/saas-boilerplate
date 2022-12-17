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
    const url = '/api/openai';
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
    .catch(err => console.log("asdkgasgkasgkads", err))
    return response
}

export const saveJobDescription = async (jobDescription: string, jobTitle: string, user_id: string) => {
    const url = '/api/save-job-description';
    let headers = new Headers()
    const fetchOptions = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify({
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            user_id: user_id
        })
    }
    let response = await fetch(url, fetchOptions)
    .then(res => res.text())
    .catch(err => console.log("Error", err))
    return response
}