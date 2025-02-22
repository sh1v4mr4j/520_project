import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Menu,
  Row,
  Space,
  Spin,
} from "antd";
import MapView from "./MapView";
import nominatimService from "../../services/nominatim/nominatim-service";

const LocationSearch = () => {
  const { searchNominatim } = nominatimService();
  const [mapParams, setMapParams] = useState({});
  const [mapMode, setMapMode] = useState("userLoc");

  // Spinners
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  // Alerts
  const [showAlert, setShowAlert] = useState(false);

  const [menuResults, setMenuResults] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");

  const handleMenuClick = (e) => {
    console.log("onClick");
    setSelectedMenuId(e.key);
    setMapMode("place");
    setMapParams({ q: encodeURIComponent(menuResults[e.key].label) });
  };

  const onFinish = (values) => {
    const searchString = values.search;
    setLoadingSpinner(true);

    // search for places
    searchNominatim(searchString)
      .then((responses) => {
        // If no results found, set alert
        if (responses.length === 0) {
          setShowAlert(true);
        } else {
          const menuResultPlaces = [];
          let counter = 0;
          responses.forEach((response) => {
            const name = String(response.name);
            // Name + 2 for including the ',' and space after
            const address = String(response.display_name).substring(
              name.length + 2
            );
            menuResultPlaces.push({
              key: counter++,
              label: String(name).trim(),
              extra: address,
              location: { lat: response.lat, lon: response.lon },
            });
          });
          setMenuResults(menuResultPlaces);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingSpinner(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Spin spinning={loadingSpinner} percent="auto" fullscreen />
      <Row justify="center" gutter={[16, 16]}>
        {/*Spacing on the side*/}
        {/*<Col span={1}/>*/}

        {/* Search Box */}
        <Col span={13}>
          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* Search */}
            <Form.Item
              label="Search"
              name="search"
              style={{ maxWidth: 400 }}
              rules={[
                { required: true, message: "Please input your search term!" },
              ]}
            >
              <Input placeholder="Challenge me to find something ..." />
            </Form.Item>

            {/* trigger search */}
            <Form.Item label={null}>
              <Space direction="horizontal" align="center">
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Space>
            </Form.Item>
          </Form>

          {/* List of results */}
          <div>
            {showAlert ? (
              <Alert
                message="No results found"
                type="warning"
                showIcon
                closable
                style={{ margin: "5px" }}
              />
            ) : (
              <></>
            )}
            {menuResults?.length === 0 ? (
              <></>
            ) : (
              <>
                <Divider
                  plain
                  orientation="left"
                  variant="solid"
                  style={{ fontSize: "small" }}
                >
                  Select a location to view on the map
                </Divider>
                <div
                  id="scrollableDiv"
                  style={{
                    maxHeight: 300,
                    overflow: "auto",
                    padding: "0 0px",
                    border: "1px solid rgba(140, 140, 140, 0.35)",
                  }}
                >
                  <Menu
                    mode="inline"
                    onClick={handleMenuClick}
                    selectedKeys={[selectedMenuId]}
                    items={menuResults}
                  />
                </div>
              </>
            )}
          </div>
        </Col>

        {/* MapView */}
        <Col span={10}>
          <MapView mapMode={mapMode} mapParams={mapParams} />
        </Col>
        <Col span={1} />
      </Row>
    </>
  );
};

export default LocationSearch;
