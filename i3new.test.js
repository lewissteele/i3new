const { exec } = require('child_process')
const i3new = require('./i3new')

jest.mock('child_process')

test('it calls i3-msg -t get_workspaces and parses json', async () => {
  exec.mockImplementation((command, callback) => {
    expect(command).toBe('i3-msg -t get_workspaces')
    callback(
      null,
      { stdout: '[{"focused":true,"num":1},{"focused":false,"num":2}]' }
    )
  })
  expect(await i3new.getWorkspaces()).toHaveLength(2)
})

test('it finds the focused workspace', () => {
  const workspaces = [
    { focused: false, num: 1 },
    { focused: false, num: 2 },
    { focused: true, num: 3 },
    { focused: false, num: 4 }
  ]

  expect(i3new.getFocusedWorkspace(workspaces)).toBe(3)
})

test('it finds the closest workspace to focused with nothing in it', () => {
  const workspaces = [
    { focused: false, num: 1 },
    { focused: true, num: 2 },
    { focused: false, num: 4 }
  ]
  expect(i3new.getClosestAvailableWorkspace(workspaces, 2)).toBe(3)
})

test('it calls i3-msg to move to new workspace', () => {
  exec.mockImplementation((command, callback) => {
    expect(command).toBe('i3-msg workspace 2')
    callback()
  })

  i3new.moveTo(2)
})
