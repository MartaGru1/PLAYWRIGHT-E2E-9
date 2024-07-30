import { Page, Locator, expect } from '@playwright/test';


export class ProjectPage {
  readonly title: Locator;
  readonly newTodoInput: Locator;
  readonly addButton: Locator;
  readonly searchField: Locator;
  readonly noTaskMessage: Locator;
  readonly taskList: Locator;
  readonly removeButtons: Locator;
  readonly removeCompletedButton: Locator;
  readonly errorMessage: Locator;
  

  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('text ="My Tasks"');
    this.newTodoInput = page.locator('#input-add');
    this.addButton = page.locator('#add-btn');
    this.searchField = page.locator('input#search');
    this.noTaskMessage = page.locator('div').filter({ hasText: /^No tasks found!$/ });
    this.taskList = page.locator('ul#task-list > li');
    this.removeButtons = page.locator('button.remove')
    this.removeCompletedButton = page.locator('role=button[name="Remove completed tasks!"]'); 
    this.errorMessage = page.locator('div.error-message'); 
  }


  async goto(): Promise<void> {
    await this.page.goto('https://www.techglobal-training.com/frontend/project-6');
  }

  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async remove(text: string): Promise<void> {
    const todo = this.newTodoInput.filter({ hasText: text });
    await todo.hover();

    await todo.locator('.destroy').click();
  }

  async removeAll(): Promise<void> {
    while ((await this.newTodoInput.count()) > 0) {
      await this.newTodoInput.first().hover();
      await this.newTodoInput.locator('.destroy').first().click();
    }
  }

  async isModalVisible() {
    await this.page.isVisible('.p.panel-heading');
  }

  async isNewTodoInputEnabled() {
    return await this.newTodoInput.isEnabled();
  }

  async isAddButtonEnabled() {
    return await this.page.locator('#add').isEnabled();
  }

  async isSearchFieldEnabled() {
    return await this.page.locator('#search').isEnabled();
  }

  async isTaskListEmpty(): Promise<boolean> {
    return (await this.newTodoInput.count()) === 0;
  }

  async markTaskAsCompleted(task: string): Promise<void> {
    const todo = this.newTodoInput.filter({ hasText: task });
    await todo.locator('.toggle').click();
  }

  async addTodoItem(task: string): Promise<void> {
    await this.newTodoInput.fill(task);
    await this.page.locator('#add').click();

  }

  async validateTaskInList(task: string): Promise<void> {
    await this.newTodoInput.filter({ hasText: task });
  }

  async validateTaskCount(count: number): Promise<void> {
    await this.newTodoInput.count();
  }

  async markTodoItemCompleted(task: string): Promise<void> {
    const todo = this.newTodoInput.filter({ hasText: task });
    await todo.locator('.toggle').click();
  }

  async validateTaskCompleted(task: string): Promise<void> {
    const todo = this.newTodoInput.filter({ hasText: task });
    await todo.locator('.completed').count();
  }

  async removeCompletedTask(task: string) {
    const taskLocator = this.taskList.locator(`text=${task}`);
    const removeButton = taskLocator.locator('button.remove'); // Adjust based on actual remove button structure
    await removeButton.click();
  }

  async searchTodoItem(task: string): Promise<void> {
    await this.page.locator('#search').fill(task);
  }

  async validateTasksEmpty(): Promise<void> {
    await this.page.locator('.todo-item').count();
  }

  async markAllTasksAsCompleted() {
    const tasks = this.taskList;
    const taskCount = await tasks.count();
    for (let i = 0; i < taskCount; i++) {
      await tasks.nth(i).click();
    }
  }
  
 async addTask(task: string) {
    await this.newTodoInput.fill(task);
    await this.addButton.click();
  }

  async addEmptyTask() {
    await this.newTodoInput.fill('');
    await this.addButton.click();
  }

  async addLongTask(task: string) {
    await this.newTodoInput.fill(task);
    await this.addButton.click();
  }

  async addDuplicateTask(task: string) {
    await this.newTodoInput.fill(task);
    await this.addButton.click();
  }
  async addTask(task: string) {
    await this.newTodoInput.fill(task);
    await this.addButton.click();
  }

  async addEmptyTask() {
    await this.newTodoInput.fill('');
    await this.addButton.click();
  }

  async addLongTask(task: string) {
    await this.newTodoInput.fill(task);
    await this.addButton.click();
  }

  async addDuplicateTask(task: string) {
    await this.newTodoInput.fill(task);
    await this.addButton.click();

  async validateEmptyTaskError() {
    await expect(this.errorMessage).toHaveText('No task found!');
  }

  async validateLongTaskError() {
    await expect(this.errorMessage).toHaveText('Error: Todo cannot be more than 30 characters!');
  }

  async validateDuplicateTaskError(task: string) {
    await expect(this.errorMessage).toHaveText(`Error: You already have ${task} in your todo list.`);
  }




}


