
const LogInForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" name='userName' placeholder='Username...' value={props.userName} onChange={props.handleChange} />
        <input type="password" name='password' placeholder='Password...' value={props.password} onChange={props.handleChange} />
        <input type="submit" value="Submit" style={{ display: 'none' }} />
    </form>
)

export default LogInForm;