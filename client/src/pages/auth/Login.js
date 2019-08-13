import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoaderWidget from "../../components/Loader";

import { loginUser } from "../../redux/actions";
import { isUserAuthenticated } from "../../helpers/authUtils";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  FormGroup,
  Button,
  Alert
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput
} from "availity-reactstrap-validation";

const Login = ({ loading, error, loginUser, history }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleValidSubmit = e => {
    loginUser(account, password, history);
    //loginUser(account, password);
  };

  /**
   * Redirect to root
   */
  const renderRedirectToRoot = () => {
    const isAuthTokenValid = isUserAuthenticated();
    if (isAuthTokenValid) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Fragment>
      {renderRedirectToRoot()}
      <div className="account-pages mt-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={5}>
              <Card>
                <div className="card-header pt-4 pb-4 text-center bg-primary" />

                <CardBody className="p-4 position-relative">
                  {/* preloader */}
                  {loading && <LoaderWidget />}

                  <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 font-weight-bold">
                      Sign In
                    </h4>
                    <p className="text-muted mb-4">
                      請輸入帳號密碼按下登入以使用後台。
                    </p>
                  </div>

                  {error && (
                    <Alert color="danger" isOpen={error ? true : false}>
                      <div>{error}</div>
                    </Alert>
                  )}

                  <AvForm onValidSubmit={handleValidSubmit}>
                    <AvField
                      name="account"
                      label="帳號"
                      placeholder="請輸入帳號"
                      value={account}
                      onChange={e => setAccount(e.target.value)}
                      required
                      errorMessage="必填"
                    />

                    <AvGroup>
                      <Label for="password">密碼</Label>

                      <AvInput
                        type="password"
                        name="password"
                        id="password"
                        placeholder="請輸入密碼"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        errorMessage="必填"
                      />
                    </AvGroup>

                    <FormGroup>
                      <Button color="success">登入</Button>
                    </FormGroup>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { user, loading, error } = state.Auth;
  return { user, loading, error };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
