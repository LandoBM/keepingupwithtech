const addCommentHandler = async (e) => {
    e.preventDefault()
    const id = document.querySelector('.btn').getAttribute('data-id')
    const comment_text = document.querySelector('.commentBody').value.trim()
    // const id = document.querySelector('.btn').getAttribute('data-id')

    if (comment_text) {
        const response = await fetch (`/api/${id}`, {
            method: 'POST',
            body: JSON.stringify({comments: comment_text, user_id: id}),
            headers: {
                'Context-Type': 'application/json'
            },
        })
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Cannot add Comment')
        }
    }
}

document.querySelector('.comForm').addEventListener('submit', addCommentHandler)