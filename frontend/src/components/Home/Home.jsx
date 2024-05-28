import React from 'react';
import { 
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBBadge,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBCardFooter
} from 'mdb-react-ui-kit';

function Dashboard() {
  return (
    <MDBContainer fluid>
      <MDBRow className='justify-content-center'>
        <MDBCol md='11'>
          <section>
            {/* <h5 className='mb-4'>Last month</h5> */}
            <br/>
            <MDBRow>
              <MDBCol md='3' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                          <MDBIcon icon='map-marker-alt' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Địa điểm</p>
                        <h2 className='mb-0'>
                          71,897
                          {/* <span className='text-success' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-up' className='ms-1' size='sm' />
                            <span> 5.4%</span>
                          </span> */}
                        </h2>
                      </div>
                    </div>
                  </MDBCardBody>
                  <MDBCardFooter background='light' className='border-0 p-2'>
                    <MDBBtn color='none' className='ms-3' tag='a' href='#'>
                      Xem thêm <MDBIcon icon='arrow-right' className='ms-2' />
                    </MDBBtn>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>

              <MDBCol md='3' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                          <MDBIcon icon='user' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Tài khoản người dùng</p>
                        <h2 className='mb-0'>
                          146,926
                          {/* <span className='text-success' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-up' className='ms-1' size='sm' />
                            <span> 8.3%</span>
                          </span> */}
                        </h2>
                      </div>
                    </div>
                  </MDBCardBody>
                  <MDBCardFooter background='light' className='border-0 p-2'>
                    <MDBBtn color='none' className='ms-3' tag='a' href='#'>
                      Xem thêm <MDBIcon icon='arrow-right' className='ms-2' />
                    </MDBBtn>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>

              <MDBCol md='3' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                          <MDBIcon icon='comments' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Phản hồi</p>
                        <h2 className='mb-0'>
                          24.57
                          {/* <span className='text-danger' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-down' className='ms-1' size='sm' />
                            <span> 3.9%</span>
                          </span> */}
                        </h2>
                      </div>
                    </div>
                  </MDBCardBody>
                  <MDBCardFooter background='light' className='border-0 p-2'>
                    <MDBBtn color='none' className='ms-3' tag='a' href='#'>
                      Xem thêm <MDBIcon icon='arrow-right' className='ms-2' />
                    </MDBBtn>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>

              <MDBCol md='3' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                          <MDBIcon icon='chart-pie' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Loại địa điểm</p>
                        <h2 className='mb-0'>
                          24.57
                          {/* <span className='text-danger' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-down' className='ms-1' size='sm' />
                            <span> 3.9%</span>
                          </span> */}
                        </h2>
                      </div>
                    </div>
                    {/* <iframe src="https://thoitiet.vn/embed/yyvuapulmz?days=5&hC=%23ffffff&hB=%23FF0000&tC=%23848484&bC=%23FF0000&lC=%23dddddd" id="widgeturl" width="100%" height="297" scrolling="no" frameborder="0" allowtransparency="true" ></iframe> */}
                  </MDBCardBody>
                  <MDBCardFooter background='light' className='border-0 p-2'>
                    <MDBBtn color='none' className='ms-3' tag='a' href='#'>
                      Xem thêm <MDBIcon icon='arrow-right' className='ms-2' />
                    </MDBBtn>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Dashboard;
