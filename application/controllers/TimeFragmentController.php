<?php

class TimeFragmentController extends Tiddr_Controller_Action
{

    public function init()
    {
        $ajaxContext = $this->_helper->getHelper('AjaxContext');
        $ajaxContext
            ->addActionContext('index', 'json')
            ->initContext();

    }

    public function indexAction()
    {
        $this->_buildJson($this->_restRoute($this->getRequest()));
    }

    public function _create($data)
    {
        try {
            $id = $this->_getData('id', $data);
            $project = $this->_getData('project', $data);
            $startTime = $this->_getData('start_time', $data);
            $endTime = $this->_getData('end_time', $data);
            $timeFragment = new Application_Model_TimeFragment(
                $id, $project, $startTime, $endTime
            );
            $timeFragment->save();
        } catch (Exception $e) {
            return array(
                'status' => 'error',
                'message' => $e->getMessage()
            );
        }
        return array(
            'status' => 'ok',
            'data' => $data 
        );
    }

    private function _getData($key, $data)
    {
        
        return array_key_exists($key, $data)?$data[$key]:null;
    }
}

