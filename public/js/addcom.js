const addCommentHandler = async (e) => {
    e.preventDefault()
    const comment_text = document.querySelector('.commentBody').value.trim()
    const post_id = document.querySelector('.btn').getAttribute('data-id')

    if (comment_text && post_id) {
        const response = await fetch (`/api/posts/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify({comment_text}),
            headers: {
                'Context-Type': 'application/json'
            },
        })
        if (response.ok) {
            document.location.replace('/post')
        } else {
            alert('Cannot add Comment')
        }
    }
}

document.querySelector('.comForm').addEventListener('submit', addCommentHandler)