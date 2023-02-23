const addCommentHandler = async (e) => {
    e.preventDefault()
    const id = document.querySelector('.btn').getAttribute('data-id')
    const comment_text = document.querySelector('.commentBody').value.trim()
    // const id = document.querySelector('.btn').getAttribute('data-id')

    if (comment_text) {
        const response = await fetch (`/api/comment/${id}`, {
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

const delCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comment/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id
              }),
        });

        if (response.ok) {
            document.location.replace('/post');
        } else {
            alert('Failed to delete project');
        }
    }
};

document.querySelector('#deleteCom').addEventListener('submit', delCommentHandler)

document.querySelector('.comForm').addEventListener('submit', addCommentHandler)