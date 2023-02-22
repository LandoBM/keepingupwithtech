const updatePostBtn = async (event) => {
    event. preventDefault()

    let postTitle = document.querySelector('input[name="post-title"]').value
    let post = document.querySelector('textarea[name="post-text"]').value

    if(event.target.hasAttribute('data.id')) {
        const id = event.target.getAttribute('data-id')

        const response = await fetch(`/api/post/edit-post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                postTitle,
                post
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