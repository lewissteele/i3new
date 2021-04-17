const { exec } = require('child_process')

module.exports = function i3new () {
  exec('i3-msg -t get_workspaces', (error, stdout) => {

  })
}
