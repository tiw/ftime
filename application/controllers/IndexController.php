<?php

class IndexController extends Tiddr_Controller_Action
{

    public function init()
    {
        $ajaxContext = $this->_helper->getHelper('AjaxContext');
        $ajaxContext
            ->addActionContext('index', 'json')
            ->initContext();
    }

    public function _findAllTimeFragment()
    {
        $data = array('start-time' => '');
        return array(
            'status' => 'ok',
            'data' => $data
        );
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

}
