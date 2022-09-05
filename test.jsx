function Profile() {
 const [isLoading, setIsLoading] = useState(true)
const [data, setData] = useState(null)

useEffect(() => {
async function fetchData() {
const response = await fetch('http://...')
    const data = await response.json()
setData(data)
setIsLoading(false)
}
fetchData()
}, [])

if (isLoading) {
 return <h2>Loading...</h2>

return (
  <div>
...
</div>
 ) 
