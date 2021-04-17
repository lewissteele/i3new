const i3new = require('./i3new')
const child_process = require('child_process')

jest.mock('child_process')

test('it calls i3 command', done => {
  child_process.exec.mockImplementation((command) => {
    expect(command).toBe('i3-msg -t get_workspaces')
    done()
  })
  i3new()
})
