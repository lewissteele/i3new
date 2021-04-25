const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

module.exports = Object.assign(i3new, {
  getWorkspaces,
  getFocusedWorkspace,
  getClosestAvailableWorkspace,
  moveTo
})

async function i3new () {
  const workspaces = await getWorkspaces()
  const focused = getFocusedWorkspace(workspaces)
  const closest = getClosestAvailableWorkspace(workspaces, focused)

  moveTo(closest)
}

async function getWorkspaces () {
  const out = await exec('i3-msg -t get_workspaces')
  return JSON.parse(out.stdout)
}

function getFocusedWorkspace (workspaces) {
  return workspaces.filter(workspace => workspace.focused)[0].num
}

function getClosestAvailableWorkspace (workspaces, focused) {
  const nums = workspaces.map(workspace => workspace.num)

  const range = Array.from({ length: 10 }, (v, i) => ++i)
  const available = range.filter(v => nums.indexOf(v) === -1)

  const closest = available.reduce((prev, curr) =>
    (Math.abs(curr - focused) < Math.abs(prev - focused) ? curr : prev)
  )

  return closest
}

async function moveTo (workspace) {
  await exec(`i3-msg workspace ${workspace}`)
}
