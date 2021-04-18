const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

module.exports = async function i3new () {
  const workspaces = await getWorkspaces()
  const focused = getFocusedWorkspace(workspaces)
}

async function getWorkspaces () {
  const out = await exec('i3-msg -t get_workspaces')
  return JSON.parse(out.stdout)
}

function getFocusedWorkspace (workspaces) {
  return workspaces.filter(workspace => workspace.focused)[0].num
}
