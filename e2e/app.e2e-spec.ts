import { TaskPage } from './app.po';

describe('task App', function() {
  let page: TaskPage;

  beforeEach(() => {
    page = new TaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
