describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  //for resettingthe device
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // it('should have welcome screen', async () => {
  //   await expect(element(by.id('view1'))).toBeVisible();
  // });

  it('test 1', async () => {
    await expect(element(by.id('MyUniqueId123'))).toBeVisible();
    await element(by.id('MyUniqueId123')).tap();
    // await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('view1')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
