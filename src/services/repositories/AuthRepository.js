const resource = '/auth';
class AuthRepository{
    constructor(requestInstance) {
        this.req = requestInstance;
      }
    login=(idToken)=>this.req.post(`${resource}/login`,{idToken});
}
export default AuthRepository;