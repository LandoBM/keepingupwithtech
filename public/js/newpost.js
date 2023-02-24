const newFormHandler = async(event) => {
    event.preventDefault()


    const title = document.querySelector('input[name="post-title"]').value;
    const post = document.querySelector('textarea[name="post-text"]').value;

    if (title && post) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, post }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response)

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Cannot Add Post');
    }
  }

}
document.querySelector('.newPost').addEventListener('submit', newFormHandler)

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Failed to delete project');
    }
  }
};


document.querySelector('.deletePost').addEventListener('click', delButtonHandler)
