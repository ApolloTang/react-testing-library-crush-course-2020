const myModule = (text) => {
  console.log('real module has been executed with argument:', text)
  return `real module say: ${text}`
}
export {myModule}
