const updatePostBtn = async (event) => {
    event. preventDefault()

    let title = document.querySelector('.post-title').value
    let post = document.querySelector('.post-text').value

    if(event.target.hasAttribute('data-id')) {
        // const id = event.target.getAttribute('data-id')
        const id = document.querySelector('.btn').getAttribute('data-id')

        const response = await fetch(`/api/posts`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                post_text: post
            }),
            Headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok){
            document.location.replace('/')
        } else {
            alert(response.statusText)
        }
    }
}

document
.querySelector('.editPost')
.addEventListener('click', updatePostBtn)