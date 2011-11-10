<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        $this->_helper->getHelper('AjaxContext')
            ->addContext('index', 'json')
            ->initContext();
    }

    public function indexAction()
    {
        $this->_buildJson($this->_restRoute($this->getRequest(), 'TimeFragment'));
    }

    private function _createTimeFragment($params)
    {

    }

    private function _findTimeFragment($params)
    {

    }

    private function _updateTimeFragment($params)
    {

    }

    private function _deleteTimeFragment($id)
    {

    }

    /**
     * _buildJson
     * turn the result from restRout into JSON with Zend_View
     *  
     * @param mixed $result 
     * @return void
     */
    protected function _buildJson($result)
    {
        foreach($result as $key => $value) {
            $this->view->$key = $value;
        }
        if(!isset($this->view->status))
            $this->view->status = 'error';

        if ('ok' == $this->view->status)
            $this->getResponse()->setHttpResponseCode(200);
        else 
            $this->getResponse()->setHttpResponseCode(500);
    }


    /**
     * _restRoute 
     * simulate an restful interface
     *
     * the following functions need to be implemented to handle the request.
     * 1. _find[suffix]()  to find a model
     * 2. _findAll[suffix]() find all model
     * 3. _update[suffix]() update a model
     * 4. _delete[suffix]() delete a model
     * 5. _create[suffix]() create a model
     * 
     * @param  Zend_Controller_Request_Abstract $req 
     * @param string $suffix
     * @return array
     */
    protected function _restRoute($req, $suffix = null)
    {
        if(is_null($suffix))
            $suffix = '';
        $createFunction = '_create' . $suffix;
        $deleteFunction = '_delete' . $suffix;
        $updateFunction = '_update' . $suffix;
        $findFunction = '_find' . $suffix;
        $findAllFunction = '_findAll' . $suffix;

        if ($req->isGet()) {
            $data = $req->getParams();
            $id = $req->getParam('id');
            if(isset($id)) {
                return $this->$findFunction($data);
            } else {
                return $this->$findAllFunction($data);
            }
        } elseif($req->isPost()) {
            $data = (array)json_decode($this->getRequest()->getRawBody());
            switch ($req->getHeader('X-HTTP-Method-Override')) {
            case 'DELETE':
                $id = $req->getParam('id');
                return $this->$deleteFunction($id);
                break;
            case 'PUT':
                return $this->$updateFunction($data);
                break;
            default:
                return $this->$createFunction($data);
                break;
            }
        } else {
            return array('status' => 'error', 'message' => "request is neither POST nor GET");
        }

