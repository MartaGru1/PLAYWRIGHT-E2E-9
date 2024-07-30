 import { test } from '@playwright/test';
 import { ProjectPage } from '../pages/ProjectPage';



test.describe('Project Page', () => {
  let projectPage: ProjectPage;

  test.beforeEach(async ({ page }) => {
    projectPage = new ProjectPage(page);
    await projectPage.goto();
  });

/* Navigate to https://techglobal-training.com/frontend/project-6.
Confirm that the todo-app modal is visible with the title “My Tasks.”
Validate that the New todo input field is enabled for text entry.
Validate ADD button is enabled.
Validate Search field is enabled.
Validate that the task list is empty, displaying the message “No tasks found!”
 */
  test('Test Case 01 - Todo-App Modal Verification', async ({ page }) => {
   await projectPage.isModalVisible();
   await projectPage.isNewTodoInputEnabled();
   await projectPage.isAddButtonEnabled();
   await projectPage.isSearchFieldEnabled();
   await projectPage.isTaskListEmpty();
  });


/***
 * Navigate to https://techglobal-training.com/frontend/project-6
Enter a new task in the todo input field and add it to the list.
Validate that the new task appears in the task list.
Validate that the number of tasks in the list is exactly one.
Mark the task as completed by clicking on it.
Validate item is marked as completed.
Click on the button to remove the item you have added.
Remove the completed task by clicking the designated removal button.
Validate that the task list is empty, displaying the message “No tasks found!”.
 */
  test('Test Case 02 - Single Task Addition and Removal', async () => {
    const task = 'Task1';
    await projectPage.addTodoItem(task);

    await projectPage.validateTaskInList(task);
    await projectPage.validateTaskCount(1);

    await projectPage.markTaskAsCompleted(task);
    await projectPage.validateTaskCompleted(task);
    await projectPage.removeTask(task);
    await projectPage.validateTasksEmpty();
  });

  /***
   * Navigate to https://techglobal-training.com/frontend/project-6
Enter and add 5 to-do items individually.
Validate that all added items match the items displayed on the list.
Mark all the tasks as completed by clicking on them.
Click on the “Remove completed tasks!” button to clear them.
Validate that the task list is empty, displaying the message “No tasks found!”.
   */

  test('Test Case 03 - Multiple Task Operations', async () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
    for (const task of tasks) {
      await projectPage.addTodoItem(task);
    }

    for (const task of tasks) {
      await projectPage.validateTaskInList(task);
    }

    await projectPage.validateTaskCount(tasks.length);

    // Mark all tasks as completed
    await projectPage.markAllTasksAsCompleted();

    // Remove completed tasks
    await projectPage.removeCompletedTasks();

    // Validate no tasks message
    await projectPage.validateTasksEmpty();
  });
/***
 * 
 * Navigate to https://techglobal-training.com/frontend/project-6
Enter and add 5 to-do items individually.
Validate that all added items match the items displayed on the list.
Enter the complete name of the previously added to-do item into the search bar.
Validate that the list is now filtered to show only the item you searched for.
Validate that the number of tasks visible in the list is exactly one.
 */
  test('Test Case 04 - Search and Filter Functionality in todo App', async () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
    for (const task of tasks) {
      await projectPage.addTodoItem(task);
    }

    for (const task of tasks) {
      await projectPage.validateTaskInList(task);
    }
    const searchTask = 'Task 3';
    await projectPage.searchTask(searchTask);

    await projectPage.validateSearchResults(searchTask);
    await projectPage.validateSearchResultCount(1);
  });
  /***
   * Navigate to https://techglobal-training.com/frontend/project-6
Attempt to add an empty task to the to-do list.
Validate that the task list is empty, displaying the message “No task found!”.
Enter an item name exceeding 30 characters into the list.
Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.
Add a valid item name to the list.
Validate that the active task count is exactly one.
Try to enter an item with the same name already present on the list.
Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.
   */

  test('Test Case 05 - Task Validation and Error Handling', async () => {
    await projectPage.addEmptyTask();

    const longTaskName = 'a'.repeat(31);
    await projectPage.addLongTask(longTaskName);
    await projectPage.validateLongTaskError();

    const validTask = 'Valid Task';
    await projectPage.addTask(validTask);
    await projectPage.validateTaskInList(validTask);
    await projectPage.validateTaskCount(1);

    await projectPage.addDuplicateTask(validTask);
    await projectPage.validateDuplicateTaskError(validTask);
  });


});


