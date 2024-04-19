import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Row, Col, Button } from 'react-bootstrap';


export default function AdvancedSearch() {
    const router = useRouter();
    const { register, handleSubmit, formState: {errors}} = useForm();

    function submitForm(data) {
        let queryString = `${data.searchBy}=true`;
        if (data.geoLocation) {
            queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
        }
        if (data.medium) {
            queryString += `&medium=${encodeURIComponent(data.medium)}`;
        }
        if (data.isOnView) {
            queryString += `&isOnView=${data.isOnView}`;
        }
        if (data.isHighlight) {
            queryString += `&isHighlight=${data.isHighlight}`;
        }
        queryString += `&q=${encodeURIComponent(data.q)}`;
        router.push(`/artwork?${queryString}`);
    }

  return (
    <>
          <Form onSubmit={handleSubmit(submitForm)}>
              <Row>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Search Query</Form.Label>
                          <Form.Control type="text" placeholder="" name="q" 
                            {...register('q', {required: true})}
                             className={`form-control ${errors.q ? 'is-invalid' : ''}`}
                          />
                          {errors.q && <div className="invalid-feedback">this field is required.</div>}
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col md={4}>
                      <Form.Label>Search By</Form.Label>
                      <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
                          <option value="title">Title</option>
                          <option value="tags">Tags</option>
                          <option value="artistOrCulture">Artist or Culture</option>
                      </Form.Select>
                  </Col>
                  <Col md={4}>
                      <Form.Group className="mb-3">
                          <Form.Label>Geo Location</Form.Label>
                          <Form.Control type="text" name="geoLocation" {...register("geoLocation")} />
                          <Form.Text className="text-muted">
                              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                          </Form.Text>
                      </Form.Group>
                  </Col>
                  <Col md={4}>
                      <Form.Group className="mb-3">
                          <Form.Label>Medium</Form.Label>
                          <Form.Control type="text" name="medium" {...register("medium")} />
                          <Form.Text className="text-muted">
                              Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                          </Form.Text>
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <Form.Check
                          type="checkbox"
                          label="Highlighted"
                          name="isHighlight"
                          {...register("isHighlight")}
                      />
                      <Form.Check
                          type="checkbox"
                          label="Currently on View"
                          name="isOnView"
                          {...register("isOnView")}
                      />
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <br />
                      <Button variant="dark" type="submit">
                          Submit
                      </Button>
                  </Col>
              </Row>
          </Form>
    </>
  )
}