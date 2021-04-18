const rewire = require('rewire')
const { exec } = require('child_process')

const i3new = rewire('./i3new')

jest.mock('child_process')

test('it calls i3-msg -t get_workspaces and parses json', async () => {
  exec.mockImplementation((command, callback) => {
    expect(command).toBe('i3-msg -t get_workspaces')
    callback(
      null,
      { stdout: '[{"focused":true,"num":1},{"focused":false,"num":2}]' }
    )
  })
  expect(await i3new.__get__('getWorkspaces')()).toHaveLength(2)
})

test('it finds the focused workspace', () => {
  const workspaces = [
    { focused: false, num: 1 },
    { focused: false, num: 2 },
    { focused: true, num: 3 },
    { focused: false, num: 4 }
  ]

  expect(i3new.__get__('getFocusedWorkspace')(workspaces)).toBe(3)
})
