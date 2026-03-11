import { test, expect } from '@playwright/test';

test('CRUD test', async ({ request }) => {
  const payload = {
    title: 'API Test',
    body: 'Testing CRUD',
    userId: 5512
  };

  // create new post
  const createResponse = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: payload
    }
  );

  const createBody = await createResponse.json();

  // Validate response structure
  expect(createBody).toHaveProperty('userId');
  expect(createBody).toHaveProperty('id');
  expect(createBody).toHaveProperty('title');
  expect(createBody).toHaveProperty('body');
 

  // Validate response data matches request
  expect(createBody.userId).toBe(payload.userId);
  expect(createBody.title).toBe(payload.title);
  expect(createBody.body).toBe(payload.body);
 

  // Get ID 
  const postId = createBody.id;

  // Read data 
  const getResponse = await request.get(
    'https://jsonplaceholder.typicode.com/posts/${postId}'
  );


  const fetchedPost = await getResponse.json();

  // Validate response structure
  expect(fetchedPost).toHaveProperty('userId');
  expect(fetchedPost).toHaveProperty('id');
  expect(fetchedPost).toHaveProperty('title');
  expect(fetchedPost).toHaveProperty('body');

  // Update
  const updatedTitle = 'Testing update';

  const updateResponse = await request.patch('https://jsonplaceholder.typicode.com/posts/${postId}', {
    data: {
      title: updatedTitle
    }
  });

  // Check response code
  expect(updateResponse.status()).toBe(200);

  const updatedPost = await updateResponse.json();

  // Verify updated title
  expect(updatedPost.title).toBe(updatedTitle);

  // Verify unchanged detail
  expect(updatedPost.userId).toBe(payload.userId);
  expect(updatedPost.body).toBe(payload.body);


  // Delete
  const deleteResponse = await request.delete('https://jsonplaceholder.typicode.com/posts/${postId}');

  // Verify response code
  expect(deleteResponse.status()).toBe(200);

  // Verify deleted post
   const getDeletedResponse = await request.get(
    'https://jsonplaceholder.typicode.com/posts/${postId}'
  );

  expect(getDeletedResponse.status()).toBe(404);

});