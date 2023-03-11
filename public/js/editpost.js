const updatePostBtn = async (event) => {
    event. preventDefault()

    let title = document.querySelector('.post-title').value
    let post = document.querySelector('.post-text').value

    if(event.target.hasAttribute('data-id')) {
        // const id = event.target.getAttribute('data-id')
        const id = document.querySelector('.btn').getAttribute('data-id')

        const response = await fetch(`/api/posts/${id}`, {
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
            document.location.replace('/edit-post')
        } else {
            alert(response.statusText)
        }
    }
}

const addCommentHandler = async (e) => {
    e.preventDefault()
    const id = document.querySelector('.btn').getAttribute('data-id')
    const comment_text = document.querySelector('.commentBody').value.trim()
    // const id = document.querySelector('.btn').getAttribute('data-id')
    console.log(id, comment_text)
    if (comment_text) {
        const response = await fetch (`/api/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({comment_text}),
            headers: {
                'Context-Type': 'application/json'
            },
        })
        if (response.ok) {
            document.location.replace('/edit-post')
        } else {
            alert('Cannot add Comment')
        }
    }
}

document
.querySelector('.editPost')
.addEventListener('click', updatePostBtn)

document
.querySelector('.comForm')
.addEventListener('submit', addCommentHandler)

// document
// .querySelector('.editPost')
// .addEventListener('click', updatePostBtn)